import iconTop from '@/assets/img/icons_top.png';

export const Header = () => {
  return (
    <div className="my-12">
      <div className="text-center mb-1">
        <img src={iconTop} width="64" alt="음력 생일 계산기" className="mx-auto" />
      </div>
      <h1 className="text-2xl font-bold mb-12 text-center">음력 생일은 언제일까?</h1>
    </div>
  );
};
