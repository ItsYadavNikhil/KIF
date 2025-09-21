import Header from '../Header';

export default function HeaderExample() {
  const user = {
    name: "Alex Student",
    avatar: "/api/placeholder/32/32",
    verified: true
  };

  return (
    <div>
      <Header 
        user={user}
        onAuthClick={() => console.log('Auth clicked')}
        onMenuClick={() => console.log('Menu clicked')}
      />
    </div>
  );
}