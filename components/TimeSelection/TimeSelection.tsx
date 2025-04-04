import React from 'react';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { Container, Content } from './styles';

export default function TimeSelection({
  minutes,
  updateTimeRange,
  selectType,
  id,
}: {
  minutes: number;
  updateTimeRange: (id: string, selectType: string, newVal: number) => void;
  selectType: string;
  id: string;
}) {
  const minutesToFormatted = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours > 12 ? hours - 12 : hours;
    return `${formattedHours}:${mins.toString().padStart(2, '0')} ${period}`;
  };

  const generateTimeSlots = () => {
    const times = [];
    const startTime = 9 * 60; // 9:00 AM in minutes
    const endTime = 20 * 60; // 5:00 PM in minutes

    for (let minutes = startTime; minutes <= endTime; minutes += 30) {
      times.push([minutes.toString(), minutesToFormatted(minutes)]);
    }

    return times;
  };

  const times = generateTimeSlots();

  return (
    <Container>
      <Select.Root
        value={minutes.toString()}
        onValueChange={val => updateTimeRange(id, selectType, +val)}
      >
        <Select.Trigger className="SelectTrigger" aria-label="Food">
          <Select.Value placeholder={minutesToFormatted(minutes)} />
          <Select.Icon className="SelectIcon">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Content>
            <Select.Content className="SelectContent">
              <ScrollArea.Root className="Scroll" type="auto">
                <Select.Viewport asChild className="SelectViewport">
                  <ScrollArea.Viewport className="ScrollViewport">
                    <Select.Group className="group">
                      {times.map((time, i) => {
                        const minutes = time[0];
                        const formattedTime = time[1];
                        return (
                          <SelectItem key={i} value={minutes}>
                            {formattedTime}
                          </SelectItem>
                        );
                      })}
                    </Select.Group>
                  </ScrollArea.Viewport>
                </Select.Viewport>
              </ScrollArea.Root>
            </Select.Content>
          </Content>
        </Select.Portal>
      </Select.Root>
    </Container>
  );
}

interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof Select.Item> {
  children: React.ReactNode;
  className?: string;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames('SelectItem', className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </Select.ItemIndicator>
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    );
  },
);

SelectItem.displayName = 'test';
