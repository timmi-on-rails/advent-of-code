open System.IO

File.ReadLines("input.txt")

type Monkey =
  { Id: int
    Items: list<int>
    Operation: string
    TestDivisibleBy: int
    TestTrueMonkeyId: int
    TestFalseMonkeyId: int }

let parseMonkey (lines: list<string>) : Result<Option<Monkey>, string> =
  match lines with
  | head :: tail ->
    if head.StartsWith("Monkey") then
      { Id = 1
        Items = []
        Operation = ""
        TestDivisibleBy = 1
        TestTrueMonkeyId = 5
        TestFalseMonkeyId = 3 }
      |> Some
      |> Ok
    else
      None |> Ok
  | [] -> None |> Ok



(*
  parseMonkeys
    -> parse until there is no monkey
    -> expect end of file

  parse

*)
