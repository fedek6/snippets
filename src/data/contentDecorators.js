import { UserOutlined, BulbOutlined, QuestionOutlined } from "@ant-design/icons";

const categoryDecorator = {
  javascript: {
    niceName: "JavaScript",
    description: "Curated collection of JavaScript snippets",
  },
  typescript: {
    niceName: "TypeScript",
    description: "Curated collection of TypeScript snippets",
  },
  decorate(category) {
    return this[category] ?? { niceName: category, description: "" };
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
    description: "Loop examples",
    icon: UserOutlined,
  },
  events: {
    niceName: "Events",
    description: "Event handling",
    icon: UserOutlined,
  },
  math: {
    niceName: "Math",
    description: "Math object",
    icon: UserOutlined,
  },
  dom: {
    niceName: "DOM",
    description: "HTML DOM API",
    icon: UserOutlined,
  },
  basics: {
    niceName: "Language basics",
    description: "Basic language concepts",
    icon: QuestionOutlined,
  },
  "data-types": {
    niceName: "Data types",
    description: "More complex data types in TS",
    icon: BulbOutlined,
  },
  decorate(category) {
    return (
      this[category] ?? {
        niceName: category.charAt(0).toUpperCase() + category.slice(1),
        description: "",
        icon: UserOutlined,
      }
    );
  },
};

export { categoryDecorator, subCategoryDecorator };
