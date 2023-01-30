import { motion } from 'framer-motion';
import { FC } from 'react';

interface Props {
  status: 'Pending' | 'Paid' | 'Delivering' | 'Completed';
}

const STATUS_WIDTH = {
  Pending: 20,
  Paid: 150,
  Delivering: 300,
  Completed: 600,
};

const OrderStatusBar: FC<Props> = ({ status }) => {
  const width = STATUS_WIDTH[status];
  return (
    <div className="flex flex-col items-center">
      <div className="h-[40px] w-[600px] overflow-hidden rounded-full border border-white bg-white">
        <motion.div
          className="h-[40px] bg-orange-500"
          style={{
            width: 1,
          }}
          animate={{
            width,
            borderTopRightRadius: [
              '10px 15px',
              '20px 24px',
              '18px 25px',
              '21px 36px',
              '11px 22px',
            ],
            borderBottomRightRadius: [
              '25px 9px',
              '5px 35px',
              '10px 15px',
              '21px 5px',
              '8px 25px',
            ],
          }}
          transition={{
            ease: 'linear',
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
            width: {
              repeat: 0,
              duration: 3,
            },
          }}
        ></motion.div>
      </div>
      <div className="relative flex w-[600px] text-xl font-light">
        <p>Pending</p>
        <p className="relative left-[55px]">Paid</p>
        <p className="relative left-[150px]">Delivering</p>
        <p className="relative left-[310px]">Completed</p>
      </div>
    </div>
  );
};

export default OrderStatusBar;
