import { Col, Modal, Row, Form, Input, Select, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { addTheatre,updateTheatre } from "../../api/theatres";

const TheatreFormModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedTheatre,
  setSelectedTheatre,
  formType,
  getData,
}) => {
  const dispatch = useDispatch();
  const {user}=useSelector((state)=>state.users);
  
  const onFinish = async (values) => {
    try {
      console.log("onfinsh values", values);

      dispatch(ShowLoading());
      let response = null;
      if (formType === "add") {
        response = await addTheatre({...values, owner:user._id});
      } else {

        values._id=selectedTheatre._id;
        response = await updateTheatre(values);
      }
      console.log("form type", formType,"values", values, response.success)

      if (response.success) {
        getData();
        message.success(response.message);
        console.log("theatre saved successfully")
        setIsModalOpen(false);
      } else {
        message.error(response.message);
      }
      setSelectedTheatre(null);
      dispatch(HideLoading());
    } catch (err) {
      dispatch(HideLoading());
      message.error(err.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTheatre(null);
  };

  return (
    <Modal
      centered
      title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
      open={isModalOpen}
      onCancel={handleCancel}
      width={800}
      footer={null}
    >
      <Form layout="vertical" 
      initialValues={selectedTheatre} 
      onFinish={onFinish}
      >
        <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
          <Col span={24}>
            <Form.Item
              label="Theatre Name"
              name="name"
              rules={[{ required: true, message: "Theatre name is required!" }]}
            >
              <Input placeholder="Enter the Theatre name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "address is required!" }]}
            >
              <TextArea rows="4" placeholder="Enter the address" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: "phoneNumber is required!" },
                  ]}
                >
                  <Input type="number" placeholder="Enter the phoneNumber" />
                </Form.Item>
              </Col>
              
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Theatre email is required!" },
                  ]}
                >
               <Input type="String" placeholder="Enter the Email" />
                </Form.Item>

              </Col>
            </Row>
          </Col>
         
        </Row>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ fontSize: "1rem", fontWeight: "600" }}
          >
            Submit the Data
          </Button>
          <Button className="mt-3" block onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TheatreFormModal;


