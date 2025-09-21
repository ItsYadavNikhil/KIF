import AuthForm from '../AuthForm';

export default function AuthFormExample() {
  return (
    <AuthForm 
      onSubmit={(data) => console.log('Auth form submitted:', data)}
    />
  );
}