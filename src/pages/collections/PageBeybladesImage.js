import React from "react";
import { Image, Typography } from 'antd';

const PageBeybladesImage = ({ beyblade }) => {

  const { Text } = Typography;

  return (
    <>
      <div className="cardListImage">
        {
          beyblade.map((obj) => <div className="cardImage">
            <Image
              width={200} height={200}
              src={`https://static.wikia.nocookie.net/beyblade/images/${obj.hashImage_beyblade}`}
            />
            <Text strong>{obj.name_beyblade}</Text>
          </div>
          )
        }
      </div>
    </>
  )
}
export default PageBeybladesImage;