export default {
  name: "product",
  title: "Affiliate Product",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Product Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "affiliateLink",
      title: "Amazon Affiliate Link",
      type: "url",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
    },
    {
      name: "page",
      title: "Show On Page",
      type: "string",
      options: {
        list: [
          { title: "Keyboard Tester (Home)", value: "keyboard" },
          { title: "Mouse Rate Test", value: "mouse" },
          { title: "Both Pages", value: "both" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers show first (e.g. 1, 2, 3...)",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "page",
      media: "image",
    },
  },
};
