import { 
    Box, HStack, IconButton, Image, Heading, Text, 
    useColorModeValue, useToast, Modal, ModalContent, 
    ModalCloseButton, ModalOverlay, ModalHeader, 
    ModalFooter, ModalBody, VStack, Input, useDisclosure, Button
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";  // useState React'ten import edilmeli!
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
    const [updateProduct, setUpdateProduct] = useState(product);  // updateProduct küçük harfle başlamalı
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const { deleteProduct, updateProduct: updateProductStore } = useProductStore();  // useProductStore içindeki updateProduct çağırımı düzeltilmeli
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        toast({
            title: success ? "Başarılı" : "Hata",
            description: message,
            status: success ? "Başarılı" : "Hata",
            isClosable: true,
            duration: 3000,
        });
    };

    const handleUpdateProduct = async () => {
        const { success, message } = await updateProductStore(product._id, updateProduct);  // updateProductStore kullanıldı!
        toast({
            title: success ? "Başarılı" : "Hata",
            description: message,
            status: success ? "Başarılı" : "Hata",
            isClosable: true,
            duration: 3000,
        });
        onClose();
    };

    return (
        <Box
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} w="full" h={48} objectFit="cover" />
            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {product.name}
                </Heading>
                <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red" />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={3}>
                            <Input
                                placeholder="Product Name"
                                name="name"
                                value={updateProduct.name}
                                onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder="Product Price"
                                name="price"
                                value={updateProduct.price}
                                onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })}
                            />
                            <Input
                                placeholder="Product Image URL"
                                name="image"
                                value={updateProduct.image}
                                onChange={(e) => setUpdateProduct({ ...updateProduct, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleUpdateProduct}>
                            Güncelle
                        </Button>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            İptal Et
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProductCard;
