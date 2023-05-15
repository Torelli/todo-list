import PubSub from "pubsub-js";

const projectsFactory = (title, description, dueDate, todos = []) => {
  function getProject() {
    PubSub.publish("get_project", this);
  }

  return { title, description, dueDate, todos, getProject };
};

export default projectsFactory;
