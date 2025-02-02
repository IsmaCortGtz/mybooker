import Loader from "@/components/Loader";
import Modal from "@/components/Modal";

export default function LoaderModal({ innerRef, message }) {
  return (
    <Modal
      innerRef={innerRef}
      noClose
      noEscape
      title={message}
      type="tiny"
    >
      <Loader />
    </Modal>
  );
}
