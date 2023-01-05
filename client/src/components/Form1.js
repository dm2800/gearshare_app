import Button from "react-bootstrap/esm/Button";
import { Form, Container } from "react-bootstrap";

const Form1 = (props)=>{


    const {submitHandler, onChangeHandler, instrument, errors, buttonText } = props; 

    return(
        <Container className="">
            <Form className="" onSubmit={submitHandler}>
                <Form.Group className="row justify-content-center mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control className= "w-25" name = "title" value = {instrument.title} onChange = {onChangeHandler} type = "text"></Form.Control>

                {
                    errors.title?
                    <span>{errors.title.message}</span>
                    :null 
                }

                </Form.Group>
                <Form.Group className="row justify-content-center mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control className= "w-25" name = "price" value = {instrument.price} onChange = {onChangeHandler} type = "text"></Form.Control>
                {
                    errors.price?
                    <span>{errors.price.message}</span>
                    :null 
                }

                </Form.Group>
                <Form.Group className="row justify-content-center mb-3">
                    <Form.Label className="">Description</Form.Label>
                    <Form.Control className= "w-25" name = "description" value = {instrument.description} onChange = {onChangeHandler} type = "text"></Form.Control>
                {
                    errors.description?
                    <span>{errors.description.message}</span>
                    :null 
                }
                </Form.Group>
                <Form.Group className="row justify-content-center mb-3">
                    <Form.Label>Image Url</Form.Label>
                    <Form.Control className= "w-25" name = "image" value = {instrument.image} onChange = {onChangeHandler} type = "text"></Form.Control>
                {
                    errors.image?
                    <span>{errors.image.message}</span>
                    :null 
                }
                </Form.Group>
                <br></br>
                
                <Button variant="primary" type="submit">{buttonText}</Button>
                
                

                
            </Form>
        </Container>
    )
}

export default Form1;