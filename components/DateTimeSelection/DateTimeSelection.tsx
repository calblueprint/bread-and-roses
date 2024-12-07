import { useState } from 'react';
import TimeSelection from '@/components/TimeSelection/TimeSelection';
import COLORS from '@/styles/colors';
import { H6, SMALL } from '@/styles/text';
import { AddTime, Bar, Container, TimeList, Times } from './styles';

export default function DateTimeSelection({ date }: { date: Date }) {
  const [timeList, setTimeList] = useState([
    <Times key={0}>
      {/* initialize at 9 am / 5 pm */}
      <TimeSelection minutes={9 * 60} />
      <H6 $color={COLORS.gray8}> - </H6>
      <TimeSelection minutes={17 * 60} />
    </Times>,
  ]);

  const onAddBtnClick = () => {
    setTimeList(
      timeList.concat(
        <Times>
          {/* initialize at 9 am / 5 pm */}
          <TimeSelection minutes={9 * 60} />
          <H6 $color={COLORS.gray8}> - </H6>
          <TimeSelection minutes={17 * 60} />
        </Times>,
      ),
    );
  };

  return (
    <Container>
      <H6 $fontWeight={500}>
        {date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </H6>
      <Bar />
      <TimeList> {timeList}</TimeList>
      <AddTime onClick={() => onAddBtnClick()}>
        <SMALL $color={COLORS.lilac8} $fontWeight={400}>
          add time
        </SMALL>
      </AddTime>
    </Container>
  );
}
