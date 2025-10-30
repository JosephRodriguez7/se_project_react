import avatar from "../assets/avatar.svg";
import ItemCard from "./ItemCard";
import ItemModal from "./ItemModal";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

function Profile({
  clothingItems,
  handleOpenItemModal,
  handleOpenAddClothesModal,
  handleLogoutUser,
  handleOpenEditUserModal,
}) {
  return (
    <>
      <main className="profile">
        <SideBar
          handleLogoutUser={handleLogoutUser}
          handleOpenEditUserModal={handleOpenEditUserModal}
        />
        <ClothesSection
          clothingItems={clothingItems}
          handleOpenItemModal={handleOpenItemModal}
          handleOpenAddClothesModal={handleOpenAddClothesModal}
        />
      </main>
    </>
  );
}

export default Profile;
