const enforcePageMetadataFormat = (context) => {
  let metadataExists = false

  const validateMetadata = (node) => {
    const properties = node.properties
    const titleProperty = properties.find(
      (property) => property.key?.name === "title"
    )

    return !!titleProperty
  }

  return {
    VariableDeclarator(node) {
      if (
        context.getFilename().match(/\/page\.tsx$/) &&
        node.id.type === "Identifier" &&
        node.id.name.toLowerCase() === "metadata" &&
        node.init.type === "ObjectExpression" &&
        !validateMetadata(node.init)
      ) {
        context.report({
          node: node.init,
          message:
            "Metadata object must contain a title property conforming to the <PageName> - Roundtable format.",
        })
      }
    },
    VariableDeclaration(node) {
      if (
        context.getFilename().endsWith("/page.tsx") &&
        node.declarations &&
        node.declarations.some(
          (declaration) =>
            declaration.id.name?.toLowerCase() === "metadata" &&
            declaration.init &&
            declaration.init.type === "ObjectExpression"
        )
      ) {
        metadataExists = true
      }
    },
    FunctionDeclaration(node) {
      if (
        context.getFilename().match(/\/page\.tsx$/) &&
        node.id.type === "Identifier" &&
        node.id.name.toLowerCase() === "generatemetadata"
      ) {
        metadataExists = true
      }
    },
    "Program:exit"(node) {
      if (context.getFilename().endsWith("/page.tsx") && !metadataExists) {
        context.report({
          node: context.getSourceCode().ast,
          message:
            "Metadata object or generateMetadata function must be declared in the file.",
        })
      }
    },
  }
}

module.exports = { enforcePageMetadataFormat }
