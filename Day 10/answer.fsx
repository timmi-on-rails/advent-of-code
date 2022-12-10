open System.IO

let (|Prefix|_|) (p: string) (s: string) =
  if s.StartsWith(p) then
    Some(s.Substring(p.Length))
  else
    None

let registerX =
  File.ReadLines("input.txt")
  |> Seq.collect (fun instruction ->
    match instruction with
    | "noop" -> [ 0 ]
    | Prefix "addx " x -> [ 0; x |> int ]
    | s -> s |> sprintf "unknown instruction '%s'" |> failwith)
  |> Seq.fold (fun s x -> s @ [ s[s.Length - 1] + x ]) [ 1 ]

registerX
|> List.mapi (fun index x -> (index + 1) * x)
|> fun s -> [ s[19]; s[59]; s[99]; s[139]; s[179]; s[219] ]
|> List.sum
|> printfn "%i"

let screenWidth = 40
let screenHeight = 6

seq { 0 .. screenWidth * screenHeight - 1 }
|> Seq.map (fun p ->
  if registerX[p] - 1 <= (p % screenWidth) && (p % screenWidth) <= registerX[p] + 1 then
    '#'
  else
    '.')
|> Seq.chunkBySize screenWidth
|> Seq.map System.String
|> Seq.iter (printfn "%s")
