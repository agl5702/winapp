import React from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    ListIcon,
    useDisclosure
} from '@chakra-ui/react';
import { CgLogOut } from 'react-icons/cg';
import { NavLink,useNavigate } from 'react-router-dom';
import { logout } from '../api/torneos.api';

export default function LogoutDialog({ handleLogout }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const navigate = useNavigate();

    const confirmLogout = async () => {
        await handleLogout();
        onClose();
        navigate('/')
    };

    return (
        <>
            <NavLink to="/" onClick={onOpen}>
                <ListIcon as={CgLogOut} color="red" my="1px" />
                Log out
            </NavLink>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            ¿Estás seguro que quieres cerrar sesión?
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Esta acción cerrará tu sesión actual.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                No
                            </Button>
                            <Button colorScheme='red' onClick={confirmLogout} ml={3}>
                                Sí
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}
