import { ButtonText, Heading, ModalFooter, VStack, Image } from "@gluestack-ui/themed";
import { Icon } from "@gluestack-ui/themed";
import { ModalBody } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { CloseIcon } from "@gluestack-ui/themed";
import { ModalCloseButton } from "@gluestack-ui/themed";
import { ModalBackdrop, ModalHeader } from "@gluestack-ui/themed";
import { Modal, ModalContent } from "@gluestack-ui/themed";
import React, { useState } from "react";
import QRCode from 'react-native-qrcode-svg';
import qrCode from './../../assets/qrCode.png'

export function ModalPayment({ showModal, setShowModal, paymentName }) {

    console.log(showModal);
    const ref = React.useRef(null);

    type Props = {
        paymentName: string
    }

    return(
        <VStack alignItems="center" zIndex={1000}>
            <Modal
                  isOpen={showModal}
                  onClose={() => {
                    setShowModal(false);
                  }}
                  finalFocusRef={ref}
                >
                  <ModalBackdrop />
                  <ModalContent>
                    <ModalHeader>
                      <Heading size='lg'>Confirmar pagamento</Heading>
                      <ModalCloseButton>
                        <Icon as={CloseIcon} />
                      </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                      <Text >
                    Deseja confirmar pagamento em {paymentName} ?
                      </Text>

                      {paymentName === "Pix" && (
                        <VStack alignItems="center" mt={'$5'}>
                          <Text mb="$2">Escaneie o QR code abaixo para pagar via Pix:</Text>
                          <Image 
                            source={qrCode} // Usando a imagem importada
                            alt="QR Code"
                            w={'$40'}
                            h={'$40'}
                          />
                        </VStack>
                      )}
                    </ModalBody>
                    <ModalFooter justifyContent="space-between" pl={'$10'} pr={'$10'}>
                      <Button
                        variant="outline"
                        size="sm"
                        action="secondary"
                        mr="$3"
                        onPress={() => {
                          setShowModal(false);
                        }}
                      >
                        <ButtonText>Cancel</ButtonText>
                      </Button>
                      <Button
                        size="sm"
                        action="positive"
                        borderWidth='$0'
                        onPress={() => {
                          setShowModal(false);
                        }}
                      >
                        <ButtonText>Confirmar</ButtonText>
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
        </VStack>
    );
};