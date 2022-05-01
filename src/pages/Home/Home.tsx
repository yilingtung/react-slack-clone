import Header from '../../components/Header';

type Props = {
  className?: string;
};

export function Home({ className }: Props) {
  return (
    <div className={className}>
      <Header />
    </div>
  );
}
