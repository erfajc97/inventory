import useOpenCloseModal from "../../../hooks/useOpenCloseModal";


const useSelectEquipmentUpdate = () => {
  const { isOpenModal, handleOpenCloseModal } = useOpenCloseModal();

  const isOpenModalEditEquipment = isOpenModal;

  const onCancelEditEquipment = () => {
    handleOpenCloseModal();
  };

  const editEquipment = () => {
    handleOpenCloseModal();
  };

  return {
    isOpenModalEditEquipment,
    onCancelEditEquipment,
    editEquipment,
  };
};

export default useSelectEquipmentUpdate;
