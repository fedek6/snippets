import { UserOutlined, BulbOutlined } from "@ant-design/icons";

const categoryDecorator = {
  javascript: {
    niceName: "JavaScript",
    description: "Curated collection of JavaScript snippets",
  },
  typescript: {
    niceName: "TypeScript",
    description: "Curated collection of TypeScript snippets",
  },
};

const subCategoryDecorator = {
  debug: {
    niceName: "Debug",
    description: "Debug techniques",
    icon: BulbOutlined,
  },
  loops: {
    niceName: "Loops",
    description: "Debug techniques",
    icon: UserOutlined,
  },
};

export { categoryDecorator, subCategoryDecorator };
