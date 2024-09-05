import { UserForm } from 'features/AuthenticationUser';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Path } from 'shared/types/path';

const SignUpPage = () => {
  const cookie = cookies();
  const user = cookie.get('user');

  if (user) redirect(Path.MAIN);

  return <UserForm isLogin={false} />;
};

export default SignUpPage;
