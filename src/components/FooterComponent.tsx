import { Footer, Center } from '@mantine/core';

const FooterComponent: React.FC = () => {
  return (
   <Footer height={60} p="md" style={{ backgroundColor: '#161b22', borderTop: '1px solid #30363d' }}>
           <Center style={{ color: '#888' }}>© {new Date().getFullYear()} SpaceX Explorer. All rights reserved.</Center>
         </Footer>
  );
};

export default FooterComponent;
