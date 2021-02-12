import React from "react";
import { Button, Drawer } from "antd";
import { useProjectModal } from "utils/project";

export const ProjectModal = () => {
  const [modalOpen, openModal, closeModal] = useProjectModal();
  return (
    <Drawer onClose={closeModal} visible={modalOpen} width={"100%"}>
      <h1>Project Modal</h1>
      <Button onClick={closeModal}>关闭</Button>
    </Drawer>
  );
};
