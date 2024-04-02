import useOpenCloseModal from "../../../hooks/useOpenCloseModal";


const useSelectSupplyUpdate = () => {
  const { isOpenModal, handleOpenCloseModal } = useOpenCloseModal();

  const isOpenModalEditSupply = isOpenModal;

  const onCancelEditSupply = () => {
    handleOpenCloseModal();
  };

  const editSupply = () => {
    handleOpenCloseModal();
  };

  return {
    isOpenModalEditSupply,
    onCancelEditSupply,
    editSupply,
  };
};

export default useSelectSupplyUpdate;
