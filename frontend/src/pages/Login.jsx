import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utiils/api";
import {
  Text,
  Stack,
  Fieldset,
  Button,
  Field,
  Input,
  Flex,
} from "@chakra-ui/react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
  
  return (
    <Flex align={"center"} justify={"center"} h={"100vh"}>
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
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </Field.Root>
        </Fieldset.Content>
        <Field.Root>
          {error && (
            <Text color="red.500" mb={4}>
              {error}
            </Text>
          )}
          <Button
            type="submit"
            onClick={handleSubmit}
            colorScheme="teal"
            variant="solid"
            isLoading={isLoading}
            isDisabled={!formData.email || !formData.password}
          >
            Login
          </Button>
        </Field.Root>
      </Fieldset.Root>
    </Flex>
  );
};

export default Login;
