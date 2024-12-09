import { useContext } from 'react';
import TimeSelection from '@/components/TimeSelection/TimeSelection';
import X from '@/public/images/x.svg';
import COLORS from '@/styles/colors';
import { H6, SMALL } from '@/styles/text';
import { AvailabilityContext, defaultRange } from '@/utils/availabilityContext';
import {
  AddTime,
  Bar,
  Container,
  DeleteButton,
  Image,
  TimeList,
  Times,
} from './styles';

export default function DateTimeSelection({ date }: { date: string }) {
  const availabilityContext = useContext(AvailabilityContext);

  if (!availabilityContext) return null;

  const { times, setTimes } = availabilityContext;
  console.log(times);
  const addTimeRange = () => {
    setTimes({
      ...times,
      [date]: [...times[date], structuredClone(defaultRange)],
    });
  };

  const updateTimeRange = (
    index: number,
    selectType: string,
    newVal: number,
  ) => {
    const newDateTimes = [...times[date]];
    if (selectType == 'start') {
      newDateTimes[index].start = newVal;
    } else {
      newDateTimes[index].end = newVal;
    }
    setTimes({ ...times, [date]: newDateTimes });
  };

  const deleteTimeRange = (index: number) => {
    setTimes({ ...times, [date]: times[date].filter((_, i) => i !== index) });
  };

  return (
    <Container>
      <H6 $fontWeight={500}>
        {new Date(date).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </H6>
      <Bar />
      <TimeList>
        {times[date].map((time, index) => (
          <Times key={index}>
            {/* initialize at 9 am / 5 pm */}
            <TimeSelection
              minutes={time.start}
              selectType="start"
              updateTimeRange={updateTimeRange}
              index={index}
            />
            <H6 $color={COLORS.gray8}> &ndash; </H6>
            <TimeSelection
              minutes={time.end}
              selectType="end"
              updateTimeRange={updateTimeRange}
              index={index}
            />
            <DeleteButton onClick={() => deleteTimeRange(index)}>
              <Image src={X} alt="delete" />
            </DeleteButton>
          </Times>
        ))}
      </TimeList>
      <AddTime onClick={() => addTimeRange()}>
        <SMALL $color={COLORS.lilac8} $fontWeight={400}>
          add time
        </SMALL>
      </AddTime>
    </Container>
  );
}
