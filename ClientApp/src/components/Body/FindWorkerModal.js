
import React from "react";
import {
                    Card,
                    CardBody,
                    DropdownItem,
                    NavItem,
                    NavLink,
                    CardImg,
                    Spinner,
                    Nav,
                    Button,
                    Container,
                    UncontrolledCarousel,
                    TabContent,
                    TabPane,
                    Row,
                    Badge,
                    FormGroup,
                    Input,
                    InputGroupAddon,
                    InputGroupText,
                    InputGroup,
                    Modal,
                    ModalHeader,
                    ModalBody,
                    ModalFooter,
                    Col
                } from "reactstrap";

class FindWorkerModal extends React.Component {
                    render() {
                                        return (
            <Modal size="lg" style={{maxWidth: '700px', width: '100%'}} isOpen={this.state.openModal}>
            <ModalHeader>Arama Sonuçları</ModalHeader>
            <ModalBody>
                {this.props.data.map((e)=>{
                
                <li>{e.affix}</li>
                })}
            </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={this.onCloseModal}>
                Kapat
            </Button>
            </ModalFooter>
    </Modal>
                                        );
                    }
}