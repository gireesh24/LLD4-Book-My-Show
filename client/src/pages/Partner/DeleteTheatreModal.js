import { Modal, message } from "antd";
import { deleteTheatre } from "../../api/theatres";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

const DeleteTheatreModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedTheatre,
  setSelectedTheatre,
  getData,
}) => {
  const dispatch = useDispatch();

  const handleOk = async () => {
    try {
      dispatch(ShowLoading());
      const theatreId = selectedTheatre._id;
      // console.log("deleted theatre id:---",theatreId);
      // console.log(selectedTheatre);
      const response = await deleteTheatre({ theatreId });
      console.log("delete theatre api response",response)
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      setSelectedTheatre(null);
      setIsDeleteModalOpen(false);
      dispatch(HideLoading());
    } catch (err) {
      dispatch(HideLoading());
      setIsDeleteModalOpen(false);
      message.error(err.message);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedTheatre(null);
  };

  return (
    <Modal centered
      title="Delete Theatre?"
      open={isDeleteModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p style={{fontWeight:"bold", fontSize:'30px', color:"green"}}>Movie Name :-{selectedTheatre.name}</p>
      <p className="pt-3 fs-18">Are you sure you want to delete this Theatre?</p>
      <p className="pb-3 fs-18">
        This action can't be undone and you'll lose this movie data.
      </p>
    </Modal>
  );
};

export default DeleteTheatreModal;

// import React from 'react'

// function DeleteTheatreModal() {
//   return (
//     <div>DeleteTheatreModal</div>
//   )
// }

// export default DeleteTheatreModal