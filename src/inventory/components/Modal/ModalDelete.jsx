import { Button, Row } from "antd";
import CustomModal from "../../../UI/CustomComponentsAntD/CustomModal";
import Waring from "../../../assets/Waring";
const ModalDelete = ({ title, onCancel, Validation, isOpenModal }) => {
  return (
    <CustomModal onCancel={onCancel} isOpenModal={isOpenModal}>
      <Row style={{ marginBlock: "2rem" }} justify="center">
        <Waring/>
      </Row>
      <Row justify="center">
        <div>
          <h3> ¿Seguro que deseas eliminar </h3>
          <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
            este {title.toLowerCase()}?
          </h3>
        </div>
        <Row justify="center">
          <Button
            shape="round"
            style={{
              backgroundColor: "white",
              padding: "0 4rem",
              color: "#8D8D8D",
              marginTop: "1rem",
              marginBottom: "1rem",
              marginRight: "1rem",
              border: "1px solid #8D8D8D",
            }}
            onClick={onCancel}
            type="primary"
          >
            CANCELAR
          </Button>
          <Button
            shape="round"
            style={{
              backgroundColor: "#10B48C",
              padding: "0 4rem",
              color: "white",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
            onClick={Validation}
            type="primary"
          >
            BORRAR
          </Button>
        </Row>
      </Row>
    </CustomModal>
  );
};

export default ModalDelete;
