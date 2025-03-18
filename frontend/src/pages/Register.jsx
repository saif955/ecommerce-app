import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utiils/api';
import {
  Text,
  Stack,
  Fieldset,
  Button,
  Field,
  Input,
  Flex,
} from "@chakra-ui/react";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { token } = await registerUser(formData);
      
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex align={"center"} justify={"center"} h={"100vh"}>
      <Fieldset.Root size="lg" maxW="md" p={4}>
        <Stack>
          <Text fontSize="2xl" fontWeight={"bold"}>
            Register Information
          </Text>
          <Fieldset.HelperText>
            Please provide your Registration Information below.
          </Fieldset.HelperText>
        </Stack>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>name</Field.Label>
            <Input
              name="name"
              type="name"
              placeholder="jon doe"
              value={formData.name}
              onChange={handleChange}
            />
          </Field.Root>
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
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Confirm Password</Field.Label>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="confirm password"
              value={formData.confirmPassword}
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
            isDisabled={!formData.name || !formData.email || !formData.password || !formData.confirmPassword}
          >
            Register
          </Button>
        </Field.Root>
      </Fieldset.Root>
    </Flex>
    
  );
};

export default Register;
