import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useProfileCompletion } from "../../hooks/useProfile";

export default function ProfileCompletion() {

  const { data, isLoading } =
    useProfileCompletion();

  if (isLoading || !data) return null;

  return (

    <Card
      sx={{
        borderRadius: 3,
        height: "100%",
      }}
    >

      <CardContent>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          mb={2}
        >

          <CheckCircleIcon
            color="success"
          />

          <Typography
            variant="h6"
            fontWeight={700}
          >
            Profile Completion
          </Typography>

        </Stack>

        <Typography
          variant="h3"
          fontWeight={700}
          mb={1}
        >
          {data.completion}%
        </Typography>

        <LinearProgress
          variant="determinate"
          value={data.completion}
          sx={{
            height: 10,
            borderRadius: 10,
            mb: 2,
          }}
        />

        <Typography
          color="text.secondary"
        >
          {data.completedFields} of{" "}
          {data.totalFields} profile fields completed
        </Typography>

        <Box mt={3}>

          {data.completion === 100 ? (

            <Typography
              color="success.main"
              fontWeight={600}
            >
              🎉 Your profile is fully completed.
            </Typography>

          ) : (

            <Typography
              color="warning.main"
              fontWeight={600}
            >
              Complete your profile to improve your HR records.
            </Typography>

          )}

        </Box>

      </CardContent>

    </Card>

  );

}