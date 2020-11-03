package com.techgroup.kipfit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.techgroup.kipfit.web.rest.TestUtil;

public class ExerciseTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExerciseType.class);
        ExerciseType exerciseType1 = new ExerciseType();
        exerciseType1.setId(1L);
        ExerciseType exerciseType2 = new ExerciseType();
        exerciseType2.setId(exerciseType1.getId());
        assertThat(exerciseType1).isEqualTo(exerciseType2);
        exerciseType2.setId(2L);
        assertThat(exerciseType1).isNotEqualTo(exerciseType2);
        exerciseType1.setId(null);
        assertThat(exerciseType1).isNotEqualTo(exerciseType2);
    }
}
