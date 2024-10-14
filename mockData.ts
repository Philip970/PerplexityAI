import { faker } from "@faker-js/faker";

faker.seed(12);

const data = [...Array(100).keys()].map(() => ({
  key: faker.string.uuid(),
  title: faker.music.artist(),
  image: faker.image.urlLoremFlickr({
    width: 300,
    height: 300 * 1.4,
    category: "nature",
  }),
  bg: faker.internet.color(),
  description: faker.lorem.sentence({ min: 1, max: 100 }),
  author: {
    name: faker.person.fullName(),
    avatar: faker.image.avatarGitHub(),
  },
}));

export type Item = (typeof data)[0];
export default data;
