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
  const addTimeRange = () => {
    /* Assign a unique ID to each time slot to ensure correct deletion*/
    setTimes({
      ...times,
      [date]: [
        ...times[date],
        { ...structuredClone(defaultRange), id: crypto.randomUUID() },
      ],
    });
  };

  const updateTimeRange = (id: string, selectType: string, newVal: number) => {
    const newDateTimes = times[date].map(time => {
      if (time.id === id) {
        return {
          ...time,
          [selectType]: newVal,
        };
      }
      return time;
    });

    setTimes({ ...times, [date]: newDateTimes });
  };

  const deleteTimeRange = (id: string) => {
    setTimes({ ...times, [date]: times[date].filter(time => time.id !== id) });
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
        {times[date].map(time => (
          <Times key={time.id}>
            {/* initialize at 9 am / 5 pm */}
            <TimeSelection
              minutes={time.start}
              selectType="start"
              updateTimeRange={updateTimeRange}
              id={time.id}
            />
            <H6 $color={COLORS.gray8}> &ndash; </H6>
            <TimeSelection
              minutes={time.end}
              selectType="end"
              updateTimeRange={updateTimeRange}
              id={time.id}
            />
            <DeleteButton onClick={() => deleteTimeRange(time.id)}>
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
