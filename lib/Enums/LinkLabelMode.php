<?php

namespace OCA\Permalink\Enums;

enum LinkLabelMode: int {
	case NoLabel = 0;
	case SameAsToken = 1;
	case UserSpecified = 2;
}

