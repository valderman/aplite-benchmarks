OPTS=--opt-all --opt-whole-program=off -fforce-recomp

aplite: factors.hs
	hastec $(OPTS) factors.hs -DTUNING=defaultTuning --output-html

aplite-asm: factors.hs
	hastec $(OPTS) factors.hs -DTUNING=asmjsTuning --output-html
