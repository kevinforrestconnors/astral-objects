import { setMegaverseToGoal } from "./services/phase";

{
  // Phase 1
  document.getElementById("phase")?.addEventListener("click", () => {
    setMegaverseToGoal().then(
      (_onfullfilled) => {
        document.getElementById("phase-output")!.textContent = "Phase complete";
      },
      (onrejected) => {
        document.getElementById("phase-output")!.textContent = `Phase failed, Error: ${onrejected}`;
      }
    );
  });
}
