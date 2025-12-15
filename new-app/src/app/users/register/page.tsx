import UserRegistrationForm from '@/components/organisms/UserRegistrationForm';

export default function RegisterUserPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <UserRegistrationForm />
      </div>
    </main>
  );
}
