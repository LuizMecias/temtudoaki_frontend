import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button, CheckBox, Input, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDialog from '../components/CustomDialog';
import usuarioService from '../services/UsuarioService';
import styles from '../styles/mainStyle';

export default function Cadastro({}) {
  const [email, setEmail] = useState(null);
  const [nome, setNome] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [senha, setSenha] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [isSelected, setSelected] = useState(false);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorNome, setErrorNome] = useState(null);
  const [errorCpf, setErrorCpf] = useState(null);
  const [errorTelefone, setErrorTelefone] = useState(null);
  const [errorSenha, setErrorSenha] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [visibleDialog, setVisibleDialog] = useState(false);
  const [titulo, setTitulo] = useState(null);
  const [mensagem, setMensagem] = useState(null);
  const [tipo, setTipo] = useState(null);

  const showDialog = (titulo, mensagem, tipo) => {
    setVisibleDialog(true);
    setTitulo(titulo);
    setMensagem(mensagem);
    setTipo(tipo);
  };

  const hideDialog = (status) => {
    setVisibleDialog(status);
  };

  const validar = () => {
    let error = false;
    setErrorEmail(null);
    setErrorTelefone(null);

    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      setErrorEmail('Campo obrigatório');
      error = true;
    }
    return !error;
  };

  const salvar = () => {
    if (validar()) {
      setLoading(true);

      let data = {
        email: email,
        cpf: cpf,
        nome: nome,
        telefone: telefone,
        senha: senha,
      };

      usuarioService
        .cadastrar(data)
        .then((response) => {
          setLoading(false);
          const titulo = response.data.status ? 'Sucesso' : 'Erro';
          showDialog(titulo, response.data.mensagem, 'SUCESSO');
          //Alert.alert(titulo, response.data.mensagem)
        })
        .catch((error) => {
          setLoading(false);
          showDialog('Erro', 'Houve um erro inesperado', 'ERRO');
          //Alert.alert("Erro", "Houve um erro inesperado")
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior='{Platform.OS === "ios" ? "padding" : "height"}'
      style={[styles.container, specificStyle.specificContainer]}
      keyboardVerticalOffset={80}
    >
      <ScrollView style={{ width: '90%' }}>
        <Text h1>Cadastre-se no TemTudoAki</Text>
        <Input
          placeholder="E-mail"
          onChangeText={(value) => {
            setEmail(value);
            setErrorEmail(null);
          }}
          keyboardType="email-address"
          errorMessage={errorEmail}
        />
        <Input
          placeholder="Nome"
          onChangeText={(value) => setNome(value)}
          errorMessage={errorNome}
        />
        <View style={styles.containerMask}>
          <TextInputMask
            placeholder="CPF"
            type={'cpf'}
            value={cpf}
            onChangeText={(value) => {
              setCpf(value);
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            style={styles.maskedInput}
          />
        </View>
        <View style={styles.containerMask}>
          <TextInputMask
            placeholder="Telefone"
            type={'phone'}
            options={{
              mask: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }}
            value={telefone}
            onChangeText={(value) => {
              setTelefone(value);
            }}
            keyboardType="phone-pad"
            returnKeyType="done"
            style={styles.maskedInput}
          />
        </View>
        <Input
          placeholder="Senha"
          onChangeText={(value) => setSenha(value)}
          errorMessage={errorSenha}
          secureTextEntry={true}
        />
        <CheckBox
          title="Eu aceito os termos de uso"
          checkedIcon="check"
          uncheckedIcon="square-o"
          checkedColor="green"
          uncheckedColor="red"
          checked={isSelected}
          onPress={() => setSelected(!isSelected)}
        />
        <Button
          icon={<Icon name="check" size={15} color="white" />}
          title="Salvar"
          buttonStyle={specificStyle.button}
          onPress={() => salvar()}
        />

        {isLoading && <Text>Carregando...</Text>}

        {!isLoading && (
          <Button
            icon={<Icon name="check" size={15} color="white" />}
            title="Salvar"
            buttonStyle={specificStyle.button}
            onPress={() => salvar()}
          />
        )}

        {visibleDialog && (
          <CustomDialog
            titulo={titulo}
            mensagem={mensagem}
            tipo={tipo}
            visible={visibleDialog}
            onClose={hideDialog}
          ></CustomDialog>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const specificStyle = StyleSheet.create({
  specificContainer: {
    backgroundColor: '#def',
    padding: 10,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
});
