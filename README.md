# set-get-in

> Safe get in, set in 


## Install


## Example

```js
import { getin, setin } from "../lib";
const initData = () => {
  return {
    name: "dog",
    age: 5,
    obj: {
      dog: 20,
      2: 50,
    },
    columns: [
      {
        fish: "fff",
      },
      {
        cat: "ccc",
        name: "nnn",
        sub: {
          name: "dog",
          age: 5,
          obj: {
            dog: 20,
            2: 50,
          },
          columns: [
            {
              fish: "fff",
            },
            {
              cat: "sub cat",
              name: "sub name",
            },
          ],
        },
      },
    ],
  };
};

describe("check group", () => {
  test("getin right", async () => {
    const d1 = initData();
    // setin();
    expect(getin(d1, "name")).toEqual("dog");
    expect(getin(d1, "age")).toEqual(5);
    expect(getin(d1, "obj.dog")).toEqual(20);
    expect(getin(d1, "obj.2")).toEqual(50);
    expect(getin(d1, "columns.0.fish")).toEqual("fff");
    expect(getin(d1, "columns.cat=ccc.name")).toEqual("nnn");
    expect(getin(d1, "columns.cat=ccc.name")).toEqual("nnn");
    expect(getin(d1, "columns.cat=ccc.sub.columns.cat=sub cat.name")).toEqual(
      "sub name"
    );
  });
  test("getin warn", async () => {
    const d1 = initData();
    // setin();
    expect(getin(d1, "name2")).toEqual(undefined);
    expect(getin(d1, "ag2e")).toEqual(undefined);
    expect(getin(d1, "obj.do2g")).toEqual(undefined);
    expect(getin(d1, "ob2j.2")).toEqual(undefined);
    expect(getin(d1, "columns.10.fish")).toEqual(undefined);
    expect(getin(d1, "columns.cbat=ccc.name")).toEqual(undefined);
    expect(getin(d1, "columns.cat=ccc.nafme")).toEqual(undefined);
    expect(getin(d1, "columns.cat=ccc.sub.col.umns.cat=su.b.cat.name")).toEqual(
      undefined
    );
  });
  test("setin right", async () => {
    const d1 = initData();
    const d2 = initData();
    // setin();
    {
      setin(d1, "name", "fish");
      d2.name = "fish";
      expect(d1).toEqual(d2);
    }
    {
      setin(d1, "age", 10);
      d2.age = 10;
      expect(d1).toEqual(d2);
    }
    {
      setin(d1, "obj.dog", 1000);
      d2.obj.dog = 1000;
      expect(d1).toEqual(d2);
    }
    {
      setin(d1, "columns.0.fish", "the fish2");
      d2.columns[0].fish = "the fish2";
      expect(d1).toEqual(d2);
    }
    {
      setin(d1, "columns.cat=ccc.fish", "the fish3");
      d2.columns[1].fish = "the fish3";
      expect(d1).toEqual(d2);
    }
    {
      setin(d1, "columns.cat=ccc.sub.columns.cat=sub cat.name", "the fish4");
      d2.columns[1].sub!.columns[1].name = "the fish4";
      expect(d1).toEqual(d2);
    }
  });
  test("setin warn", async () => {
    const d1 = initData();
    const d2 = initData();
    // setin();
    setin(d1, "ob2j.dog", "aaa");
    expect(d1).toEqual(d2);
    setin(d1, "columns.ca2t=cc3c.sub.columns.cat=sub cat.name", "aaa");
    expect(d1).toEqual(d2);
  });
});
```


## Test

Run test

```sh
$ npm run test-s
```

```sh
Test Suites
8 passed, 8 total

Tests
41 passed, 41 total
```
