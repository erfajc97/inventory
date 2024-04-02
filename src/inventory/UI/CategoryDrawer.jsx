import CustomDrawer from "../../UI/CustomComponentsAntD/CustomDrawer"
import CategoryInventory from "../components/Modal/CategoryInventory"

const CategoryDrawer = ({
  openDrawer,
  closeDrawer,
  errorMessage,
  setErrorMessage,
}) => {
  return (
    <aside>
      <CustomDrawer
        width={450}
        placement="right"
        isOpenDrawer={openDrawer}
        onClose={closeDrawer}
      >
        <CategoryInventory
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </CustomDrawer>
    </aside>
  )
}

export default CategoryDrawer
