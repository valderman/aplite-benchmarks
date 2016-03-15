OPTS=--opt-all --opt-whole-program=off -fforce-recomp --debug

aplite: matrix.hs
	hastec $(OPTS) matrix.hs -DTUNING=defaultTuning --output-html

aplite-asm: matrix.hs
	hastec $(OPTS) matrix.hs -DTUNING='asmjsTuning {explicitHeap = Just 0x1000000}' --output-html

haskell: matrix_hs.hs
	hastec $(OPTS) --output-html matrix_hs.hs
