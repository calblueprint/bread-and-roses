import React, { useEffect, useState } from 'react';
import InputDropdown from '@/components/InputDropdown/InputDropdown';
import Edit from '@/public/images/edit.svg';
import COLORS from '@/styles/colors';
import { H5, P } from '@/styles/text';
import * as styles from './styles';

const performanceTypeOptions = new Set([
  'Music',
  'Dance',
  'Poetry',
  'Clowning',
  'Juggling',
  'Comedy',
  'Magic',
  'Storytelling',
  'Bubbles',
  'Puppetry',
  'Other',
]);

const genreOptions = new Set([
  'A Cappella',
  'Bluegrass',
  'Blues',
  "Children's songs",
  'Classical',
  'Country',
  'Folk',
  'Jazz',
  'Pop',
  'R&B',
  'Rock',
  'Standards',
  'Other',
]);

export default function SettingCardPerformanceInterest({
  genres,
  performance_types,
}: {
  genres: string[];
  performance_types: string[];
}) {
  const handlePerformanceTypeChange = (selectedOptions: Set<string>) => {
    const selectedArray = Array.from(selectedOptions);
    //setPreferences({ ...preferences, performanceType: selectedArray });
    performance_types = selectedArray;
  };

  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [genresArray, setGenresArray] = useState<string[]>(genres);
  const [performanceTypeArray, setPerformanceTypesArray] =
    useState<string[]>(performance_types);

  const handleCancel = () => {
    setGenresArray(genres);
    setPerformanceTypesArray(performance_types);
    setIsEditable(!isEditable);
  };

  return (
    <styles.AvailabilityContainer>
      <styles.AvailabilityHeader>
        <styles.AvailabilityTitle>
          <H5 $fontWeight="500" $color={COLORS.bread1} $align="left">
            Performance Interest
          </H5>
        </styles.AvailabilityTitle>
        <styles.EditButton onClick={() => setIsEditable(!isEditable)}>
          <styles.EditIcon src={Edit} />
        </styles.EditButton>
      </styles.AvailabilityHeader>
      <styles.Content>
        <div>
          <styles.SubHeader>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Type of Act
              </P>
              <styles.SettingListedItems>
                {isEditable ? (
                  <InputDropdown
                    placeholder="Select performance type"
                    multi
                    options={performanceTypeOptions}
                    value={new Set(performanceTypeArray)}
                    onChange={selected =>
                      setPerformanceTypesArray(Array.from(selected))
                    }
                  />
                ) : (
                  performance_types.map(performance_type => {
                    return (
                      <li key={performance_type}>
                        <styles.TruncatedText
                          $fontWeight="400"
                          $color={COLORS.gray11}
                          $align="left"
                        >
                          {performance_type}
                        </styles.TruncatedText>
                      </li>
                    );
                  })
                )}
              </styles.SettingListedItems>
            </styles.SettingDetail>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Genre
              </P>
              <styles.SettingListedItems>
                {isEditable ? (
                  <InputDropdown
                    placeholder="Select genre"
                    multi
                    //onChange={handlePerformanceTypeChange}
                    options={genreOptions}
                    value={new Set(genresArray)}
                    onChange={selected => setGenresArray(Array.from(selected))}
                  />
                ) : (
                  genres.map(genre => {
                    return (
                      <li key={genre}>
                        <styles.TruncatedText
                          $fontWeight="400"
                          $color={COLORS.gray11}
                          $align="left"
                        >
                          {genre}
                        </styles.TruncatedText>
                      </li>
                    );
                  })
                )}
              </styles.SettingListedItems>
            </styles.SettingDetail>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Group Size
              </P>
              <styles.TruncatedText
                $fontWeight="400"
                $color={COLORS.gray11}
                $align="left"
              >
                2
              </styles.TruncatedText>
            </styles.SettingDetail>
          </styles.SubHeader>
          {isEditable ? (
            <div>
              <button>save</button>
              <button>cancel</button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </styles.Content>
    </styles.AvailabilityContainer>
  );
}
