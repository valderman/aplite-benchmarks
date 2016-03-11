OPTS=--opt-all --opt-whole-program=off -fforce-recomp

aplite: crc32.hs
	hastec $(OPTS) crc32.hs -DTUNING=defaultTuning --output-html

aplite-asm: crc32.hs
	hastec $(OPTS) crc32.hs -DTUNING='asmjsTuning{explicitHeap=Just 0x20000000}' --output-html
