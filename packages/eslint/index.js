const { enforcePageMetadataFormat } = require("./enforcePageMetadata")

module.exports = {
  rules: {
    "enforce-page-metadata-format": {
      meta: {
        type: "problem",
        fixable: "code",
        docs: {
          description: "Enforce the format of page metadata in page.tsx files",
        },
      },
      create: enforcePageMetadataFormat,
    },
  },
}
