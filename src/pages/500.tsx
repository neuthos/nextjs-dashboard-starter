import { Result } from 'antd';
import { useRouter } from 'next/router';

const Error500Page = () => {
  const router = useRouter();
  const message = router.query?.msg;
  return (
    <Result
      status="500"
      title="Maaf, Lagi ada kesalahan sistem"
      subTitle={message || 'Sorry, something went wrong.'}
    />
  );
};

export default Error500Page;
