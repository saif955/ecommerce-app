import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utiils/api";
import {
  Center,
  Text,
  Stack,
  Fieldset,
  Button,
  Field,
  Input,
} from "@chakra-ui/react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { token } = await loginUser(formData);
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };
  
  if (error) return <div>Error: {error}</div>
  return (
    <Center h="100vh">
      <Fieldset.Root size="lg" maxW="md" p={4}>
        <Stack>
          <Text fontSize="2xl" fontWeight={"bold"}>
            Login Information
          </Text>
          <Fieldset.HelperText>
            Please provide your Login Information below.
          </Fieldset.HelperText>
        </Stack>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Email address</Field.Label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Field.Root>
        </Fieldset.Content>
        <Field.Root>
          <Button
            type="submit"
            onClick={handleSubmit}
            colorPalette="teal"
            variant="surface"
          >
            Button
          </Button>
        </Field.Root>
      </Fieldset.Root>
    </Center>
  );
};

export default Login;