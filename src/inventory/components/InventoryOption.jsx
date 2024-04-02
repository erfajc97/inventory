import { Button, Row, Spin } from "antd";
import ModalDelete from "./Modal/ModalDelete";
import ModalEditEquipment from "./Modal/ModalEquipments/ModalEditEquipment";
import ModalEditSupply from "./Modal/ModalSupplies/ModalEditSupply";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import useInventoryOption from "../hooks/useInventoryOption";
import EditIcon from "../../assets/EditIcon";
import TrashIcon from "../../assets/TrashIcon";
import EmptyComponent from "../../UI/CustomComponentsAntD/EmptyComponent";
import EmptyIconSvg from "../../assets/EmptyIconSvg"

const InventoryOption = ({ inventory }) => {
  const {
    expandedCategories,
    editData,
    modal,
    isOpenModalEditSupply,
    onCancelEditSupply,
    isOpenModalEditEquipment,
    onCancelEditEquipment,
    deleteSupply,
    isOpenModalDeleteSupply,
    onCancelSupplyDelete,
    validationDeleteSupply,
    deleteEquipment,
    isOpenModalDeleteEquipment,
    onCancelDeleteEquipment,
    validationDeleteEquipment,
    dataEditSupply,
    dataEditEquipment,
    toggleCategory,
    loading,
  } = useInventoryOption(inventory);

  const categories = Object.keys(inventory);
  categories.pop();
  const empty = categories.map((category) => inventory[category]);

  const EmptyIcon = () => <EmptyIconSvg />;
  if (!empty.length)
    return (
      <EmptyComponent
        Icon={<EmptyIcon />}
        label={`Aun no se han agregado ${inventory.title.toLowerCase()}s`}
      />
    );

  if (loading) return <Spin size="large"  />;
  return (
    <div>
      <div>
        {categories.map((category) => (
          <div key={category}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                type="ghost"
                style={{
                  paddingBottom: "0.5rem",
                  border: "none",
                  padding: 0,
                }}
                onClick={() => toggleCategory(category)}
              >
                {expandedCategories.includes(category) ? (
                  <CaretDownOutlined />
                ) : (
                  <CaretRightOutlined />
                )}
              </Button>
              <Button
                type="ghost"
                style={{
                  color: "#232C4A",
                  fontWeight: "bold",
                  border: "none",
                }}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Button>
              <div style={{ width: "100%" }}>
                <hr />
              </div>
            </div>
            {expandedCategories.includes(category) && (
              <div>
                {inventory[category]?.map((element) => (
                  <div key={element.name}>
                    <Row justify="space-between" className="element-item-name">
                      <p style={{ color: "#757575" }}>{element.name}</p>

                      <div className="element-item-btns">
                        <Button
                          onClick={() =>
                            modal
                              ? dataEditSupply(element)
                              : dataEditEquipment(element)
                          }
                          type="ghost"
                          style={{
                            border: "none",
                            background: "none",
                            paddingTop:'8px'
                          }}
                        >
                          <EditIcon color="#50A684" width="20px" />
                        </Button>

                        <Button
                          onClick={() =>
                            modal
                              ? deleteSupply(element.id)
                              : deleteEquipment(element.id)
                          }
                          type="ghost"
                          style={{ border: "none", background: "none", paddingTop:'8px' }}
                        >
                          <TrashIcon color="#9F9F9F" width="20px" />
                        </Button>
                      </div>
                    </Row>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {modal ? (
        <div>
          <ModalDelete
            isOpenModal={isOpenModalDeleteSupply}
            Validation={validationDeleteSupply}
            onCancel={onCancelSupplyDelete}
            title={inventory.title}
          />

          <ModalEditSupply
            isOpenModal={isOpenModalEditSupply}
            closeEdit={onCancelEditSupply}
            data={editData}
          />
        </div>
      ) : (
        <div>
          <ModalDelete
            isOpenModal={isOpenModalDeleteEquipment}
            title={inventory.title}
            Validation={validationDeleteEquipment}
            onCancel={onCancelDeleteEquipment}
          />
          <ModalEditEquipment
            isOpenModal={isOpenModalEditEquipment}
            closeEdit={onCancelEditEquipment}
            data={editData}
          />
        </div>
      )}
    </div>
  );
};

export default InventoryOption;
