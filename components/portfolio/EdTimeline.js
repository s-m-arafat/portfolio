import { Timeline, Text } from "@mantine/core";
import { IconSchool } from "@tabler/icons-react";
import { EducationalQualifications } from "../../lib/const";
export default function EdTimline() {
  return (
    <Timeline active={0} bulletSize={36} lineWidth={3}>
      {EducationalQualifications.map((ed, index) => (
        <Timeline.Item
          bullet={
            <IconSchool size={24} color={`${index == 0 ? "black" : "white"}`} />
          }
          title={`${ed.certification}`}
          className="text-2xl text-white bg-slate-800/40 pt-2 pb-5 pl-8 rounded-bl-[2.5rem] rounded-tr-[2.5rem] rounded-brr-[2.5rem]"
          color="yellow.5"
          key={index}
        >
          <Text color="dimmed" className="text-slate-400 text-lg" mt={10}>
            {ed.institute}
          </Text>
          <Text size="xs" mt={5}>
            Background: {ed.subject}
          </Text>
          <Text size="xs" mt={1}>
            Passing Year: {ed.passingYear}
          </Text>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}
