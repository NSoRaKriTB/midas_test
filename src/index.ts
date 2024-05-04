import { getClockAngle } from "./Question/QuestionOne";
import { getQuestionPart } from "./Question/QuestionTwo";
import { quickestPath } from "./Question/QuestionThree";
import { minEnergy } from "./Question/QuestionFour";
getClockAngle("09:00");
getClockAngle("17:30");

getQuestionPart(["BATHROOM", "BATH SALTS", "BLOODBATH"]);
getQuestionPart(["BEFRIEND", "GIRLFRIEND", "FRIENDSHIP"]);

quickestPath({
  ladders: [
    [3, 39],
    [14, 35],
    [31, 70],
    [44, 65],
    [47, 86],
    [63, 83],
    [71, 93],
  ],
  snakes: [
    [21, 4],
    [30, 8],
    [55, 38],
    [79, 42],
    [87, 54],
    [91, 48],
    [96, 66],
  ],
});


minEnergy(0, [4, 9], [3, 6, 8], 11);